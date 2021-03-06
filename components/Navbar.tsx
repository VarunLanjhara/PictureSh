import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  useColorMode,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Tooltip,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import TagsComponent from "./TagsComponent";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { IoSave, IoLogOut, IoImages } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { logout } from "../utils/functions";
import { UserType } from "../utils/types";
import { toast } from "react-toastify";

type Props = {
  isProfile?: boolean;
  isYourImages?: boolean;
  isSearch?: boolean;
  isSavedImages?: boolean;
  isUploadImage?: boolean;
  isSingleImage?: boolean;
  user?: UserType;
  category?: string;
};

const Navbar = (props: Props) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [search, setSearch] = useState("");
  return (
    <Flex
      width="100%"
      backgroundColor={colorMode === "light" ? "#FFFFFF" : "#1a1a1a"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={80}
      flexDirection="column"
    >
      <Flex
        padding={{
          md: "28px 20px",
          sm: "0 5px",
        }}
        width="100%"
        borderBottom={
          colorMode === "light" ? "1px solid #e5e5e5" : "1px solid #373737"
        }
        alignItems="center"
        height="50px"
        justifyContent="space-between"
      >
        <Heading
          as="h3"
          size="xl"
          cursor="pointer"
          onClick={() => {
            router.push("/");
          }}
          className="pictureshlogo"
          display={{
            md: "flex",
            sm: "none",
          }}
        >
          PictureSh
        </Heading>
        <InputGroup
          marginRight={{
            md: "10",
            sm: "20px",
          }}
          marginLeft={{
            md: "10",
            sm: "5px",
          }}
        >
          <form
            style={{
              width: "100%",
            }}
            onSubmit={(event: React.FormEvent) => {
              event.preventDefault();
              if (search?.trim()?.length === 0) {
                toast.warn("Please enter a search term", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                  theme: "dark",
                });
              } else {
                router.push(`/search?q=${search}`);
              }
            }}
          >
            <InputLeftElement pointerEvents="none">
              <BiSearch color="#797a7a" size="1.2rem" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              _placeholder={{
                color: "#797a7a",
              }}
              paddingLeft="2.3rem"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(event.target.value);
              }}
            />
          </form>
        </InputGroup>
        <Flex
          gap="1rem"
          alignItems="center"
          marginRight={{
            md: "10",
            sm: "20px",
          }}
        >
          {colorMode === "light" ? (
            <Tooltip label="Dark mode" openDelay={200}>
              <IconButton
                icon={<FaMoon />}
                aria-label="Dark mode"
                onClick={() => {
                  toggleColorMode();
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip label="Light mode" openDelay={200}>
              <IconButton
                icon={<FaSun />}
                aria-label="Light mode"
                onClick={() => {
                  toggleColorMode();
                }}
              />
            </Tooltip>
          )}
          <Tooltip label="Upload image" openDelay={200}>
            <IconButton
              aria-label="Upload image"
              icon={<MdAddAPhoto />}
              onClick={() => {
                router.push("/upload");
              }}
              display={{
                md: "flex",
                sm: "none",
              }}
            />
          </Tooltip>
        </Flex>
        <Menu>
          <MenuButton>
            <Avatar
              name={props.user?.name}
              src={props.user?.image}
              cursor="pointer"
            />
          </MenuButton>
          <MenuList
            backgroundColor={colorMode === "light" ? "#FFFFFF" : "#1a1a1a"}
          >
            <MenuItem
              icon={<FaUserCircle size={18} />}
              onClick={() => {
                router.push(`/user/${props.user?.id}`);
              }}
            >
              Your profile
            </MenuItem>
            <MenuItem
              icon={<MdAddAPhoto size={18} />}
              onClick={() => {
                router.push("/upload");
              }}
            >
              Upload image
            </MenuItem>
            <MenuItem
              icon={<IoImages size={18} />}
              onClick={() => {
                router.push("/yourimages");
              }}
            >
              Your images
            </MenuItem>
            <MenuItem
              icon={<IoSave size={18} />}
              onClick={() => {
                router.push("/savedimages");
              }}
            >
              Saved images
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="#E3B341"
              icon={<AiFillStar size={18} />}
              onClick={() => {
                window.location.href =
                  "https://github.com/VarunLanjhara/PictureSh";
              }}
            >
              Star on github
            </MenuItem>
            <MenuItem
              icon={<IoLogOut size={18} />}
              color="red.400"
              onClick={logout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {props.isProfile ||
      props.isYourImages ||
      props.isSearch ||
      props.isSavedImages ||
      props.isUploadImage ||
      props.isSingleImage ? null : (
        <TagsComponent category={props.category} />
      )}
    </Flex>
  );
};

export default Navbar;
