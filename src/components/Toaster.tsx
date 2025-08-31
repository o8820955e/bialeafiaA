import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      expand={false}
      richColors
      closeButton
      dir="rtl"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          fontFamily: 'inherit',
        },
      }}
    />
  );
}
