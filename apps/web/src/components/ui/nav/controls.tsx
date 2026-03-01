import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { FC } from "react";

type AvatarWrapperProps = { src: string; alt: string };
const AvatarWrapper: FC<AvatarWrapperProps> = (props) => (
  <Avatar>
    <AvatarImage {...props} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);

const NavControls = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <AvatarWrapper
            src="https://picsum.photos/id/237/200/200"
            alt="@avatar"
          />
        </NavigationMenuTrigger>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export { NavControls };
