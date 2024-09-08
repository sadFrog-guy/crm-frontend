import { siteConfig } from "@/config/site";
import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import { IconChart } from '@/icons/IconChart';
import { IconCalendar } from '@/icons/IconCalendar';
import { IconSchool } from '@/icons/IconSchool';
import { IconGroup } from '@/icons/IconGroup';
import { NavLink } from "react-router-dom";
import NavButton from "@/components/NavButton";
import {Select, SelectItem} from "@nextui-org/select";

export default function IndexPage() {
  const buttons = [
    {
      content: 'Группы',
      icon: IconChart,
      to: siteConfig.navItems[0].href
    },
    {
      content: 'Ученики',
      icon: IconGroup,
      to: siteConfig.navItems[1].href
    },
    {
      content: 'Педагоги',
      icon: IconSchool,
      to: siteConfig.navItems[2].href
    },
    {
      content: 'Уроки',
      icon: IconCalendar,
      to: siteConfig.navItems[3].href
    },
  ]

  return (
    <div className="flex">

      <SideBar>
        <Logo/>

        <div className="flex flex-col gap-5">
          {buttons.map(button => {
            return (
              <NavLink to={button.to}>
                {({ isActive, isPending }) => (
                  <NavButton
                    isActive={isActive}
                    isPending={isPending}
                    icon={<button.icon size={18} filled fill={isActive ? "#fff" : "#006FEE"} />}
                  >
                    {button.content}
                  </NavButton>
                )}
              </NavLink>
            )
          })}
        </div>
      </SideBar>

      <div className="w-[83%] h-screen flex flex-col">
          <div className="flex justify-center items-center min-h-10 border-b-2 border-foreground-200">
            <Select 
              className="max-w-[235px]" 
              classNames={{
                trigger: "bg-white data-[hover=true]:bg-white"
              }}
              variant="flat"
              placeholder="Филиал “Munchen” г. Бишкек"
            >
                <SelectItem>
                  Филиал Konnen г. Ош
                </SelectItem>

                <SelectItem>
                  Филиал Toten г. Джалал-Абад
                </SelectItem>
            </Select>
          </div>
      </div>
    </div>
  );
}