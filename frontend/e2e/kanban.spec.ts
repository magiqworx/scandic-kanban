import { test, expect } from "@playwright/test";

test.describe("Kanban board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders board with dummy data", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Kanban" })).toBeVisible();
    await expect(page.getByTestId("column-backlog")).toBeVisible();
    await expect(page.getByTestId("column-done")).toBeVisible();
    await expect(page.getByTestId("card-card-1")).toBeVisible();
    await expect(page.getByText("Research competitors")).toBeVisible();
  });

  test("adds and deletes a card", async ({ page }) => {
    const column = page.getByTestId("column-todo");

    await column.getByRole("button", { name: "Add card" }).click();
    await column.getByLabel("Card title").fill("Integration test card");
    await column.getByLabel("Card details").fill("Created by Playwright");
    await column.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText("Integration test card")).toBeVisible();

    const card = page.getByTestId(/card-/).filter({ hasText: "Integration test card" });
    await card.getByRole("button", { name: "Delete Integration test card" }).click();

    await expect(page.getByText("Integration test card")).not.toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    await page.getByRole("button", { name: "Rename To Do" }).click();
    await page.getByLabel("Column title").fill("Next Up");
    await page.getByLabel("Column title").press("Enter");

    await expect(page.getByRole("button", { name: "Rename Next Up" })).toBeVisible();
  });

  test("drags a card to another column", async ({ page }) => {
    const dragHandle = page.getByRole("button", { name: "Drag Design board layout" });
    const targetColumn = page.getByTestId("column-done");

    const handleBox = await dragHandle.boundingBox();
    const targetBox = await targetColumn.boundingBox();
    if (!handleBox || !targetBox) throw new Error("Missing drag targets");

    await page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + 80,
      { steps: 15 },
    );
    await page.mouse.up();

    await expect(targetColumn.getByTestId("card-card-3")).toBeVisible();
  });
});
