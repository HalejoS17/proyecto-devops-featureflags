import { test, expect } from '@playwright/test';

test('muestra la lista de libros', async ({ page }) => {
  await page.goto('/');

  // Verifica que el título aparece
  await expect(page.getByTestId('titulo-biblioteca')).toBeVisible();

  // Verifica que haya libros cargados
  const listaLibros = page.locator('li');
  await expect(listaLibros).toHaveCountGreaterThan(0);
});
