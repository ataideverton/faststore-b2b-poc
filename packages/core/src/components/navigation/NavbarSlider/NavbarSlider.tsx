import { useFadeEffect, useUI } from '@faststore-b2b/ui'
import { Suspense } from 'react'

import { ButtonSignInFallback } from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'
import NavbarLinks from 'src/components/navigation/NavbarLinks'
import Logo from 'src/components/ui/Logo'

import type { NavbarProps } from '../Navbar'

import styles from './section.module.scss'
import { useOverrideComponents } from 'src/sdk/overrides/OverrideContext'

interface NavbarSliderProps {
  logo: NavbarProps['logo']
  home: NavbarProps['home']
  links: NavbarProps['links']
  region: NavbarProps['region']
  signIn: NavbarProps['signIn']
}

function NavbarSlider({
  logo,
  links,
  region,
  home: { label: homeLabel },
  signIn: { button: signInButton },
}: NavbarSliderProps) {
  const {
    NavbarSlider: NavbarSliderWrapper,
    NavbarSliderHeader,
    NavbarSliderContent,
    NavbarSliderFooter,
    _experimentalButtonSignIn: ButtonSignIn,
  } = useOverrideComponents<'Navbar'>()

  const { closeNavbar } = useUI()
  const { fade, fadeOut } = useFadeEffect()

  return (
    <NavbarSliderWrapper.Component
      fade={fade}
      onDismiss={fadeOut}
      overlayProps={{
        className: `section ${styles.section} section-navbar-slider`,
      }}
      onTransitionEnd={() => fade === 'out' && closeNavbar()}
      {...NavbarSliderWrapper.props}
    >
      <NavbarSliderHeader.Component
        onClose={fadeOut}
        {...NavbarSliderHeader.props}
      >
        <Link
          data-fs-navbar-slider-logo
          href={logo.link ? logo.link.url : '/'}
          title={logo.link ? logo.link.title : homeLabel}
          onClick={fadeOut}
        >
          <Logo alt={logo.alt} src={logo.src} />
        </Link>
      </NavbarSliderHeader.Component>
      <NavbarSliderContent.Component {...NavbarSliderContent.props}>
        <NavbarLinks onClickLink={fadeOut} links={links} region={region} />
      </NavbarSliderContent.Component>
      <NavbarSliderFooter.Component {...NavbarSliderFooter.props}>
        <Suspense fallback={<ButtonSignInFallback />}>
          <ButtonSignIn.Component {...signInButton} />
        </Suspense>
      </NavbarSliderFooter.Component>
    </NavbarSliderWrapper.Component>
  )
}

export default NavbarSlider
