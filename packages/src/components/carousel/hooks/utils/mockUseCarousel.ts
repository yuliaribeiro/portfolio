export const getDefaultHookReturn = (overrides = {}) => ({
  currentSlide: 0,
  isAutoPlaying: false,
  totalSlides: 5,
  goToSlide: vi.fn(),
  nextSlide: vi.fn(),
  prevSlide: vi.fn(),
  toggleAutoPlay: vi.fn(),
  handleKeyDown: vi.fn(),
  ...overrides,
})
