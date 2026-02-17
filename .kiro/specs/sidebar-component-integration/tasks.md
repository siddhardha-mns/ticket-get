# Implementation Plan: Sidebar Component Integration

## Overview

This implementation plan guides the integration of an animated sidebar component into a Next.js application. The approach follows a bottom-up strategy: first setting up the project infrastructure, then implementing core utilities, followed by the sidebar components, and finally creating the demo and tests.

## Tasks

- [x] 1. Set up Next.js project with required dependencies
  - Initialize Next.js project with TypeScript, Tailwind CSS, and App Router
  - Initialize shadcn/ui configuration with path aliases
  - Install framer-motion and lucide-react packages
  - Install clsx and tailwind-merge for the cn utility
  - Verify tsconfig.json has proper path aliases (@/components, @/lib)
  - _Requirements: 1.1, 1.2, 1.3, 1.6, 1.7_

- [ ] 2. Create project structure and utility functions
  - [x] 2.1 Create components/ui directory
    - Create the directory structure for shadcn components
    - _Requirements: 1.4_

  - [x] 2.2 Create lib/utils.ts with cn utility function
    - Implement the cn function that combines clsx and twMerge
    - Export the function for use throughout the application
    - _Requirements: 1.5_

  - [ ] 2.3 Write property test for cn utility function
    - **Property 1: Class Name Utility Merges Correctly**
    - **Validates: Requirements 1.5**
    - Generate random class name combinations and verify correct merging

- [ ] 3. Implement sidebar context and provider
  - [x] 3.1 Create components/ui/sidebar.tsx with TypeScript interfaces
    - Define Links interface (label, href, icon)
    - Define SidebarContextProps interface (open, setOpen, animate)
    - _Requirements: 2.8_

  - [x] 3.2 Implement SidebarContext and useSidebar hook
    - Create SidebarContext using React.createContext
    - Implement useSidebar hook that throws error if used outside provider
    - _Requirements: 2.7_

  - [ ] 3.3 Write unit test for useSidebar hook error handling
    - **Property 2: Context Hook Enforces Provider Boundary**
    - **Validates: Requirements 2.7**
    - Test that hook throws error when used outside SidebarProvider

  - [x] 3.4 Implement SidebarProvider component
    - Accept children, open, setOpen, and animate props
    - Manage internal state when open/setOpen not provided (uncontrolled mode)
    - Use provided state when open/setOpen provided (controlled mode)
    - Provide context value to children
    - _Requirements: 2.1, 8.1, 8.5_

  - [ ] 3.5 Write unit tests for SidebarProvider
    - Test controlled mode with provided open/setOpen
    - Test uncontrolled mode with internal state
    - Test default animate prop is true
    - _Requirements: 2.1, 8.5_

- [ ] 4. Implement Sidebar wrapper component
  - [x] 4.1 Create Sidebar component
    - Accept same props as SidebarProvider
    - Wrap children in SidebarProvider
    - _Requirements: 2.2_

  - [ ] 4.2 Write unit test for Sidebar component
    - Test that Sidebar renders children correctly
    - Test that props are passed to SidebarProvider
    - _Requirements: 2.2_

- [ ] 5. Checkpoint - Ensure context and provider tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement DesktopSidebar component
  - [x] 6.1 Create DesktopSidebar component with Framer Motion
    - Use motion.div from framer-motion
    - Accept className, children, and motion.div props
    - Use useSidebar hook to access open, setOpen, animate
    - Apply responsive classes: hidden md:flex md:flex-col
    - Apply background: bg-neutral-100 dark:bg-neutral-800
    - Apply padding: px-4 py-4
    - Set up width animation: 60px when closed, 300px when open
    - Add onMouseEnter to set open to true
    - Add onMouseLeave to set open to false
    - _Requirements: 2.4, 3.1, 3.2, 3.3, 3.6, 7.1, 7.2, 7.3_

  - [ ] 6.2 Write unit tests for DesktopSidebar
    - Test responsive classes are present (hidden md:flex)
    - Test dark mode classes are present
    - Test mouse enter/leave handlers update state
    - _Requirements: 3.6, 7.1_

  - [ ] 6.3 Write property test for desktop sidebar width
    - **Property 3: Desktop Sidebar Width Responds to State**
    - **Validates: Requirements 3.1, 3.2**
    - Test width is "60px" when open is false and "300px" when open is true

- [ ] 7. Implement MobileSidebar component
  - [x] 7.1 Create MobileSidebar component with animations
    - Accept className, children, and div props
    - Use useSidebar hook to access open, setOpen
    - Render header with menu button (visible on small screens only)
    - Use Menu icon from lucide-react
    - Add onClick to menu button to toggle open state
    - Use AnimatePresence from framer-motion for conditional rendering
    - Render motion.div when open is true
    - Set initial animation: x: "-100%", opacity: 0
    - Set animate: x: 0, opacity: 1
    - Set exit: x: "-100%", opacity: 0
    - Set transition: duration 0.3s, easeInOut
    - Apply full-screen overlay classes: fixed h-full w-full inset-0 z-[100]
    - Apply background: bg-white dark:bg-neutral-900
    - Render close button (X icon) with onClick to toggle open
    - Apply responsive classes to hide on md and above
    - _Requirements: 2.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 7.1_

  - [ ] 7.2 Write unit tests for MobileSidebar
    - Test menu button is rendered
    - Test close button is rendered when open
    - Test responsive classes are present (flex md:hidden)
    - Test animation props are set correctly
    - _Requirements: 4.1, 4.5, 4.7_

  - [ ] 7.3 Write property test for mobile sidebar toggle
    - **Property 5: Mobile Sidebar Toggle Updates State**
    - **Validates: Requirements 4.2, 4.6**
    - Test clicking menu button toggles state from false to true
    - Test clicking close button toggles state from true to false

- [ ] 8. Implement SidebarBody component
  - [x] 8.1 Create SidebarBody component
    - Accept motion.div props
    - Render DesktopSidebar with all props
    - Render MobileSidebar with props (cast to div props)
    - _Requirements: 2.3_

  - [ ] 8.2 Write unit test for SidebarBody
    - Test both DesktopSidebar and MobileSidebar are rendered
    - Test props are passed correctly
    - _Requirements: 2.3_

- [ ] 9. Implement SidebarLink component
  - [x] 9.1 Create SidebarLink component
    - Accept link (Links type), className, and LinkProps
    - Use useSidebar hook to access open, animate
    - Render Next.js Link component with href from link.href
    - Apply base classes: flex items-center justify-start gap-2 group/sidebar py-2
    - Render link.icon (always visible)
    - Render motion.span for link.label
    - Animate label display: "inline-block" when open, "none" when closed (if animate is true)
    - Animate label opacity: 1 when open, 0 when closed (if animate is true)
    - Apply label classes: text-neutral-700 dark:text-neutral-200 text-sm
    - Apply hover effect: group-hover/sidebar:translate-x-1 transition duration-150
    - _Requirements: 2.6, 5.2, 5.3, 5.4, 5.5, 5.6, 7.1, 7.4_

  - [ ] 9.2 Write unit tests for SidebarLink
    - Test icon is rendered
    - Test label is rendered
    - Test Next.js Link is used
    - Test hover classes are present
    - Test dark mode classes are present
    - _Requirements: 5.2, 5.6, 7.1_

  - [ ] 9.3 Write property test for label visibility
    - **Property 4: Label Visibility Responds to Sidebar State**
    - **Validates: Requirements 3.4, 3.5, 5.3, 5.4**
    - Test label display/opacity when open is false vs true with animate enabled

- [ ] 10. Checkpoint - Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Create demo components
  - [ ] 11.1 Create Logo and LogoIcon components
    - Implement Logo component with Next.js Link and motion.span
    - Implement LogoIcon component with just the icon
    - Use simple geometric shapes for logo (black/white rounded divs)
    - _Requirements: 6.3_

  - [ ] 11.2 Create Dashboard placeholder component
    - Create simple grid layout with animated placeholder boxes
    - Use neutral-100 dark:neutral-800 backgrounds
    - Apply animate-pulse for loading effect
    - _Requirements: 6.4_

  - [x] 11.3 Create SidebarDemo component
    - Import all sidebar components
    - Import lucide-react icons (LayoutDashboard, UserCog, Settings, LogOut)
    - Create links array with sample navigation items
    - Use useState for open state
    - Render Sidebar with open and setOpen props
    - Render SidebarBody with Logo/LogoIcon and links
    - Map over links array to render SidebarLink components
    - Add user avatar SidebarLink at bottom with Unsplash placeholder image
    - Render Dashboard component in main content area
    - Apply container classes: rounded-md flex flex-col md:flex-row
    - Apply border: border-neutral-200 dark:border-neutral-700
    - _Requirements: 6.1, 6.2, 6.5, 6.6, 6.7_

- [ ] 12. Create main page to display demo
  - [ ] 12.1 Update app/page.tsx to use SidebarDemo
    - Import SidebarDemo component
    - Render SidebarDemo in page
    - Apply full-height layout classes
    - _Requirements: 6.1_

- [ ] 13. Write property test for animation configuration
  - **Property 6: Animation Configuration Controls Behavior**
  - **Validates: Requirements 8.2, 8.3, 8.4**
  - Test animations enabled when animate is true
  - Test animations disabled when animate is false

- [ ] 14. Write integration tests
  - Test full sidebar interaction flow (open, navigate, close)
  - Test responsive behavior at different viewport sizes
  - Test keyboard navigation
  - _Requirements: 3.1, 3.2, 4.2, 4.6_

- [ ] 15. Final checkpoint - Verify complete implementation
  - Run all tests and ensure they pass
  - Manually test in browser at different screen sizes
  - Verify dark mode works correctly
  - Verify animations are smooth
  - Ask the user if any adjustments are needed

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and component behavior
- Use React Testing Library for component testing
- Use fast-check for property-based testing
- All property tests should be tagged with: **Feature: sidebar-component-integration, Property {number}: {property_text}**
