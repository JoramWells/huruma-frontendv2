/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, IconButton,
} from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { FaChevronRight, FaHome, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadCrumbNav = ({ link, breadCrumbData, addBtn }) => {
  const navigate = useNavigate();
  return (
    <HStack alignItems="center" justifyContent="center" w="full">
      <HStack
        w="100%"
        bgColor="white"
        h={14}
        justifyContent="space-between"
        // rounded="lg"
        borderBottom="1px"
        borderBottomColor="gray.100"
        paddingLeft="15px"

        // boxShadow="sm"
      >
        <Breadcrumb separator={(
          <FaChevronRight
            size={12}
            color="gray"
          />
              )}
        >
          <BreadcrumbItem>
            <IconButton
              onClick={() => navigate('/')}
              size="sm"
            >
              <FaHome
                size={14}
                color="gray"
              />
            </IconButton>
          </BreadcrumbItem>
          {breadCrumbData.map((item) => (
            <BreadcrumbItem
              key={item.id}
              onClick={() => navigate(item.link)}
              isCurrentPage={item.isCurrentPage}
              color="gray"
            >
              <BreadcrumbLink
                fontSize="14px"
                color={item.isCurrentPage && 'blue.500'}
                bgColor={item.isCurrentPage && 'blue.50'}
                p={2}
                rounded="lg"
              >
                {item.title}

              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}

        </Breadcrumb>
        {addBtn && (
        <Button
          colorScheme="green"
          size="sm"
          boxShadow="lg"
          onClick={() => navigate(link)}
          leftIcon={<FaPlus />}
        >
          NEW

        </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default BreadCrumbNav;

BreadCrumbNav.propTypes = {
  link: PropTypes.string,
  breadCrumbData: PropTypes.array,
  addBtn: PropTypes.bool,
};

BreadCrumbNav.defaultProps = {
  link: '/add-pharmaceuticals',
  addBtn: true,
  breadCrumbData: [
    {
      id: nanoid(),
      title: 'Stores',
      link: '/stores',
    },
    {
      id: nanoid(),
      title: 'Pharmaceuticals',
      link: '/pharmaceuticals',
      isCurrentPage: true,
    },
  ],
};
