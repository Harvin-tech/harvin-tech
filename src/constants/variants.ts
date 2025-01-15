import { tv } from 'tailwind-variants';

export const appContent = tv({
  base: 'max-w-screen-xl mx-auto px-2 sm:px-4 ', // removed px-4 since it's in the dynamic classes
  variants: {},
  compoundVariants: [],
});
