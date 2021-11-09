import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

const Nav = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/">
            <BreadcrumbLink>Home</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        {/* <BreadcrumbItem>
          <BreadcrumbLink>About</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Contact</BreadcrumbLink>
        </BreadcrumbItem> */}
      </Breadcrumb>
    </div>
  );
};

export default Nav;
