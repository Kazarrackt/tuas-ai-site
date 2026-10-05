'use client';

import { useEffect } from 'react';

export default function SiteInteractions() {
  useEffect(() => {
    const box = document.getElementById('offer');
    const form = document.getElementById('lead') as HTMLFormElement | null;
    if (!box || !form) return;

    const slides = Array.from(box.querySelectorAll<HTMLElement>('.slide'));
    const dots = Array.from(box.querySelectorAll<HTMLButtonElement>('.dot'));
    if (slides.length === 0 || dots.length !== slides.length) return;

    let index = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let touchStartX: number | null = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
