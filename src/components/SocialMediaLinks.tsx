import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { IoLogoFreebsdDevil } from "react-icons/io";

//Edit any changes to the SoDA URLs here
//Icons can be found at: https://react-icons.github.io/react-icons/
const socialMediaLinks = [
  // {
  //   href: "https://thesoda.io/",
  //   icon: <CgWebsite className="hover:text-soda-red" />,
  // },
  {
    href: "https://sundevilcentral.eoss.asu.edu/feeds?type=club&type_id=35661&tab=about",
    icon: <IoLogoFreebsdDevil className="hover:text-gray-300" />,
  },
  {
    href: "https://discord.gg/the-software-developers-association-762811961238618122",
    icon: <FaDiscord className="hover:text-gray-300" />,
  },
  {
    href: "https://www.instagram.com/soda.asu/",
    icon: <RiInstagramFill className="hover:text-gray-300" />,
  },
  {
    href: "https://www.facebook.com/SoDAASU/",
    icon: <FaFacebookSquare className="hover:text-gray-300" />,
  },
  {
    href: "https://www.linkedin.com/company/thesoda/",
    icon: <FaLinkedin className="hover:text-gray-300" />,
  },
  {
    href: "https://x.com/asu_soda",
    icon: <FaXTwitter className="hover:text-gray-300" />,
  },
  {
    href: "https://github.com/asusoda",
    icon: <FaGithub className="hover:text-gray-300" />,
  },
];

export default function SocialMediaLinks() {
  return (
    <section className="social-media-links">
      {socialMediaLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400"
        >
          {link.icon}
        </a>
      ))}
    </section>
  );
}
