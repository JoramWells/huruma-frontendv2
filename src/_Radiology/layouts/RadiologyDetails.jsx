import {
  Avatar, HStack, Text, VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useGetInternalLabRequestQuery } from '../api/internalLabRequests.api';
import BreadCrumbNav from '../../components/BreadCrumbNav';

const RadiologyDetails = () => {
  const { id } = useParams();
  const { data } = useGetInternalLabRequestQuery(id);

  //
  const breadCrumbData = [
    {
      id: nanoid(),
      title: 'Patients',
      link: '/patients',
    },
    {
      id: nanoid(),
      title: `${data?.patient.first_name} ${data?.patient.middle_name}`,
      link: '/',
      // isCurrentPage: true,
    },
    {
      id: nanoid(),
      title: 'Radiology Rq.',
      link: '/',
      isCurrentPage: true,
    },
  ];

  console.log(data);
  return (
    <VStack
      h="100vh"
      marginTop="65px"
      p="3px"
      w="100%"
    >
      <HStack
        w="100%"
      >
        <BreadCrumbNav
          breadCrumbData={breadCrumbData}
          addBtn={false}
        />
        <Avatar
          size="sm"
          color="white"
          fontWeight="bold"
          marginLeft="1rem"
          name={`${data?.patient?.first_name} ${data?.patient?.last_name}`}
        />
      </HStack>

      <Text>radiolody details</Text>
    </VStack>
  );
};

export default RadiologyDetails;
