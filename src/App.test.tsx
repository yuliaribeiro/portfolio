import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App", () => {
  it("should render the initial page without crashing", () => {
    expect(() => getRenderer()).not.toThrow()
  })
})

function getRenderer() {
  return render(<App />)
}
