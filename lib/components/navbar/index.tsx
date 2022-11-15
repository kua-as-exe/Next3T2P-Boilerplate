import Link from "next/link"
import tw, { theme } from "twin.macro"
import { IconType } from 'react-icons'

import { FaHome } from 'react-icons/fa'
import { IoMdAlbums } from 'react-icons/io'
import { BiAlbum } from 'react-icons/bi'

import { css } from "@emotion/react"
import { useRef } from "react"

type NavLink = {
  label: string
  url: string
  icon: IconType
}

const def_links: NavLink[] = [
  {
    label: 'Home',
    icon: FaHome,
    url: '/'
  },
  {
    label: 'Albums',
    icon: IoMdAlbums,
    url: '/'
  },
  {
    label: 'Songs',
    icon: BiAlbum,
    url: '/'
  },
]

const NavbarComponent: React.FC<{
  links?: NavLink[]
}> = ({ links = def_links }) => {

  return <div tw=" 
    flex w-full 
    flex-col
    sm:flex-row sm:space-x-2 
  ">
    {links.map(link => (
      <NavLink
        key={link.label}
        {...link}
      />
    ))}
  </div>

}

export default NavbarComponent

const NavLink: React.FC<NavLink> = ({ label, icon }) => {
  const Icon = icon

  return <div
    className="group"
    css={[
      tw`
        px-3 py-2 transition-all
        border-yellow-300 border-opacity-20
        bg-black bg-opacity-10
        border-b
        cursor-pointer
        ring-yellow-300 ring-opacity-20
        text-center
        text-white
        relative w-full
        flex items-center 

        hover:ring-1
        hover:text-yellow-300
        hover:bg-opacity-[0.11]

        sm:rounded-t-md 
        sm:justify-center
      `,
      css`
        transition: padding-left 0.3s;
        @media only screen and (max-width: ${theme('screens.sm')}) {
          &:hover {
            padding-left: 1rem;
          }
        }
        span {
          ${tw`
            transition-all
          ` }
        }
        .icon {
          ${tw` 
            transition mr-2
          ` }
          
        }
      `
    ]}
  >
    <div className="icon">
      <Icon />
    </div>
    <span>{label}</span>
  </div>

}
