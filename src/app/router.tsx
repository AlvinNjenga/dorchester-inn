import { createBrowserRouter } from 'react-router'
import SiteLayout from '@/layouts/SiteLayout'
import RouteError from '@/components/RouteError'
import RouteLoading from '@/components/RouteLoading'
import { rooms } from '@/content/rooms'
import { services } from '@/content/services'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SiteLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: RouteLoading,
    children: [
      {
        ErrorBoundary: RouteError,
        children: [
          ...(import.meta.env.DEV ? [{
            path: '__style-sample',
            lazy: async () => ({ Component: (await import('@/pages/StyleSamplePage')).default }),
          }] : []),
          {
            index: true,
            lazy: async () => ({ Component: (await import('@/pages/HomePage')).default }),
          },
          {
            path: 'services',
            lazy: async () => ({ Component: (await import('@/pages/ServicesPage')).default }),
          },
          {
            path: 'make-a-booking',
            lazy: async () => ({ Component: (await import('@/pages/BookingPage')).default }),
          },
          {
            path: 'rooms',
            lazy: async () => ({ Component: (await import('@/pages/RoomsPage')).default }),
          },
          {
            path: 'our-bar',
            lazy: async () => ({ Component: (await import('@/pages/BarPage')).default }),
          },
          {
            path: 'cocktail-happy-hour',
            lazy: async () => ({ Component: (await import('@/pages/HappyHourPage')).default }),
          },
          {
            path: 'about-us',
            lazy: async () => ({ Component: (await import('@/pages/AboutPage')).default }),
          },
          {
            path: 'leave-a-review',
            lazy: async () => ({ Component: (await import('@/pages/ReviewPage')).default }),
          },
          {
            path: 'blog',
            lazy: async () => ({ Component: (await import('@/pages/BlogPage')).default }),
          },
          {
            path: 'blog/:slug',
            lazy: async () => ({ Component: (await import('@/pages/ArticlePage')).default }),
          },
          {
            path: 'contact',
            lazy: async () => ({ Component: (await import('@/pages/ContactPage')).default }),
          },
          {
            path: 'gallery',
            lazy: async () => ({ Component: (await import('@/pages/GalleryPage')).default }),
          },
          {
            path: 'faqs',
            lazy: async () => ({ Component: (await import('@/pages/FaqsPage')).default }),
          },
          {
            path: 'rooms/:roomSlug',
            loader: ({ params }) => {
              if (!rooms.some((room) => room.slug === params.roomSlug)) {
                throw new Response('Room not found', { status: 404 })
              }
              return null
            },
            lazy: async () => ({ Component: (await import('@/pages/RoomDetailsPage')).default }),
          },
          {
            path: 'services/:serviceSlug',
            loader: ({ params }) => {
              if (!services.some((service) => service.slug === params.serviceSlug)) {
                throw new Response('Service not found', { status: 404 })
              }
              return null
            },
            lazy: async () => ({ Component: (await import('@/pages/ServiceDetailsPage')).default }),
          },
          {
            path: '*',
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
], { basename: import.meta.env.BASE_URL })
