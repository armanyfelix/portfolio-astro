import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '../utils/cn'
import {
  Button,
  Dialog,
  DialogTrigger,
  OverlayArrow,
  Popover,
} from 'react-aria-components'
import themes from '../data/themes.json'
import type { Theme } from '../types/themes'

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element | undefined
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()

  const [currentTheme, setCurrentTheme] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(true)
  const [background, setBackground] = useState<string>('')

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      let direction = current! - scrollYProgress.getPrevious()!
      if (scrollYProgress.get() < 0.05) {
        setVisible(true)
        setBackground('bg-transparent')
      } else {
        setBackground('dark:bg-base-300/60 backdrop-blur bg-white')
        if (direction < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }
  })

  const changeTheme = (theme: string) => {
    localStorage.setItem('theme', theme)
    setCurrentTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
        setCurrentTheme('dark')
      } else {
        setCurrentTheme('light')
      }
    } else {
      setCurrentTheme(theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newTheme = event.matches ? 'dark' : 'light'
        changeTheme(newTheme)
      })
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-8 py-2 items-center justify-center space-x-4',
          className,
          background
        )}
      >
        <h1 className='text-primary'>
          <slot />
        </h1>
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn('relative items-center flex space-x-1')}
          >
            <span className='block sm:hidden'>{navItem.icon}</span>
            <span className='hidden sm:block text-sm'>{navItem.name}</span>
          </a>
        ))}
        <DialogTrigger>
          <Button className='btn btn-ghost btn-sm'>
            {themes.find((t) => t.name === currentTheme)?.emoji || '🎨'}
          </Button>
          <Popover className='outline-none mt-5'>
            <OverlayArrow>
              <svg width={12} height={12} viewBox='0 0 12 12'>
                <path d='M0 0 L6 6 L12 0' />
              </svg>
            </OverlayArrow>
            <Dialog className='outline-none'>
              <ul
                className={`rounded-box menu menu-vertical flex-nowrap max-h-[40vh] overflow-auto gap-3 bg-accent-focus bg-opacity-30 p-3 shadow-lg backdrop-blur-md backdrop-brightness-75 md:max-h-[70vh] w-auto`}
              >
                {themes.map((t: any) => (
                  <li
                    key={t.name}
                    data-theme={t.name}
                    className='rounded-btn antialiased'
                  >
                    <button
                      onClick={() => changeTheme(t.name)}
                      className={`${currentTheme === t.name && 'ring ring-accent '} flex items-center justify-between`}
                    >
                      <div>
                        {t.emoji} {t.name}
                      </div>
                      <div className='inline-flex items-cente space-x-1'>
                        <div className='w-3 h-3 bg-primary rounded-full' />
                        <div className='w-3 h-3 bg-secondary rounded-full' />
                        <div className='w-3 h-3 bg-accent rounded-full' />
                        <div className='w-3 h-3 bg-neutral rounded-full' />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </motion.div>
    </AnimatePresence>
  )
}
