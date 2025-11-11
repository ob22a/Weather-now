import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./../../src/App";
import React from "react";

describe("App component", () => {
  it("renders the greeting message", () => {
    render(<App />);
    // Look for the text in the document
    const heading = screen.getByText(/Weather now user/i);
    expect(heading).toBeDefined();
  });
});
