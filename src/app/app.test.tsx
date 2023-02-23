import { test, expect } from "vitest";
import { render } from "@testing-library/preact";
import { App } from "./app";

test("app renders", () => {
  const { container } = render(<App />);
  expect(container.textContent).toMatch("Hello World!");
});
