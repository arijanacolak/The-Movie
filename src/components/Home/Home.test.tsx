import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./index";

describe("Home component", () => {
  test("renders tab buttons correctly", () => {
    const { getByText } = render(<Home />);
    const moviesButton = getByText("Movies");
    const showsButton = getByText("TV Shows");
    expect(moviesButton).toBeInTheDocument();
    expect(showsButton).toBeInTheDocument();
  });

  test("changes tab on button click", () => {
    const { getByText } = render(<Home />);
    const moviesButton = getByText("Movies");
    const showsButton = getByText("TV Shows");

    fireEvent.click(moviesButton);
    expect(moviesButton.classList.contains("active")).toBe(true);

    fireEvent.click(showsButton);
    expect(showsButton.classList.contains("active")).toBe(true);
  });
});
