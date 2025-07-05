import { renderHook, act } from "@testing-library/react"
import { useLanguage } from "./useLanguage"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n"

describe("useLanguage", () => {
  vi.unmock("react-i18next")

  beforeEach(() => {
    i18n.changeLanguage("en")
    localStorage.clear()
  })

  it("should return currentLang as 'en'", () => {
    const { result } = getRenderer()
    expect(result.current.currentLang).toBe("en")
    expect(result.current.label).toBe("EN")
  })

  it("should return currentLang as 'pt'", () => {
    act(() => {
      i18n.changeLanguage("pt")
    })
    const { result } = getRenderer()
    expect(result.current.currentLang).toBe("pt")
    expect(result.current.label).toBe("PT")
  })

  it("should toggle language from en to pt", () => {
    const { result } = getRenderer()
    act(() => result.current.toggleLanguage())
    expect(i18n.language).toBe("pt")
    expect(result.current.currentLang).toBe("pt")
  })

  it("should toggle language from pt to en", () => {
    act(() => {
      i18n.changeLanguage("pt")
    })

    const { result } = getRenderer()
    act(() => result.current.toggleLanguage())
    expect(i18n.language).toBe("en")
    expect(result.current.currentLang).toBe("en")
  })
})

function wrapper({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

function getRenderer() {
  return renderHook(() => useLanguage(), { wrapper })
}
