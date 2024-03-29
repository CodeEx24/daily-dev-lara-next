import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import SidebarLinks from './SidebarLinks';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="lg:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] overflow-auto">
        <SidebarLinks />
      </SheetContent>
    </Sheet>
  );
}
