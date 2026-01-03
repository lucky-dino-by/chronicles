import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'chronicles-theme'

function applyTheme(theme: Theme) {
  if (theme === 'system') {
    // Remove data-theme to let CSS media query handle it
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored
      }
      // Default to system if no stored theme
      return 'system'
    } catch (error) {
      console.error('Error loading theme from localStorage:', error)
      return 'system'
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
      applyTheme(theme)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
  }, [theme])

  useEffect(() => {
    // Set initial theme on mount
    applyTheme(theme)

    // Listen to system preference changes when theme is 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        applyTheme('system')
      }
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  return {
    theme,
    toggleTheme,
  }
}

