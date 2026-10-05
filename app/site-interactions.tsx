'use client';

import { useEffect } from 'react';

export default function SiteInteractions() {
  useEffect(() => {
    const box = document.getElementById('offer');
    const form = document.getElementById('lead') as HTMLFormElement | null;
    if (!box || !form) return;

    const modelCards = Array.from(document.querySelectorAll<HTMLElement>('.models span'));
    const slides = Array.from(box.querySelectorAll<HTMLElement>('.slide'));
    const dots = Array.from(box.querySelectorAll<HTMLButtonElement>('.dot'));
    if (slides.length === 0 || dots.length !== slides.length) return;

    let index = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let touchStartX: number | null = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resetModelCard = (card: HTMLElement) => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--lift');
      card.classList.remove('is-tilting');
    };
    const onModelPointerMove = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === 'touch') return;
      const card = event.currentTarget as HTMLElement;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 10}deg`);
      card.style.setProperty('--lift', '-3px');
      card.classList.add('is-tilting');
    };
    const onModelPointerLeave = (event: Event) => {
      resetModelCard(event.currentTarget as HTMLElement);
    };
    const onModelBlur = (event: Event) => {
      resetModelCard(event.currentTarget as HTMLElement);
    };

    const show = (next: number) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, current) => {
        slide.classList.toggle('is-on', current === index);
        slide.setAttribute('aria-hidden', current === index ? 'false' : 'true');
      });
      dots.forEach((dot, current) => {
        dot.classList.toggle('is-on', current === index);
        dot.setAttribute('aria-pressed', current === index ? 'true' : 'false');
      });
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      if (!reducedMotion && !timer) timer = setInterval(() => show(index + 1), 4500);
    };
    const onDotClick = (event: Event) => {
      const dot = event.currentTarget as HTMLButtonElement;
      stop();
      show(dots.indexOf(dot));
      start();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? null;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartX === null) return;
      const delta = event.changedTouches[0]?.clientX;
      if (delta !== undefined && Math.abs(delta - touchStartX) > 40) {
        stop();
        show(index + (delta < touchStartX ? 1 : -1));
        start();
      }
      touchStartX = null;
    };
    const onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.innerHTML =
        '<div class="thanks" role="status"><h3>Thanks, we have your details.</h3><p>We will be in touch within one business day.</p></div>';
    };

    modelCards.forEach((card) => {
      card.addEventListener('pointermove', onModelPointerMove);
      card.addEventListener('pointerleave', onModelPointerLeave);
      card.addEventListener('pointercancel', onModelPointerLeave);
      card.addEventListener('blur', onModelBlur);
    });
    dots.forEach((dot) => dot.addEventListener('click', onDotClick));
    box.addEventListener('mouseenter', stop);
    box.addEventListener('mouseleave', start);
    box.addEventListener('focusin', stop);
    box.addEventListener('focusout', start);
    box.addEventListener('touchstart', onTouchStart, { passive: true });
    box.addEventListener('touchend', onTouchEnd, { passive: true });
    form.addEventListener('submit', onSubmit);
    start();

    return () => {
      stop();
      modelCards.forEach((card) => {
        resetModelCard(card);
        card.removeEventListener('pointermove', onModelPointerMove);
        card.removeEventListener('pointerleave', onModelPointerLeave);
        card.removeEventListener('pointercancel', onModelPointerLeave);
        card.removeEventListener('blur', onModelBlur);
      });
      dots.forEach((dot) => dot.removeEventListener('click', onDotClick));
      box.removeEventListener('mouseenter', stop);
      box.removeEventListener('mouseleave', start);
      box.removeEventListener('focusin', stop);
      box.removeEventListener('focusout', start);
      box.removeEventListener('touchstart', onTouchStart);
      box.removeEventListener('touchend', onTouchEnd);
      form.removeEventListener('submit', onSubmit);
    };
  }, []);

  return null;
}
