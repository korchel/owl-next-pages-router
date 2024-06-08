import { SidebarProps } from "./Sidebar.props";

const Sidebar = ({className, ...props}: SidebarProps) => {
  return (
    <div {...props}>
      sidebar
    </div>
  );
};

export default Sidebar;