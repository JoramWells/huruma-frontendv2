/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { HStack, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
// import TableSearchFilter from './Tables/TableSearchFilter';

const TableSearchInput = ({ columnFilters, setColumFilters, searchQueryColumn }) => {
  const patientName = columnFilters.find((f) => f.id === 'patient_detail')?.value || '';

  const onFilterChange = (id, value) => setColumFilters(
    (prev) => prev.filter((f) => f.id !== id).concat({
      id, value,
    }),
  );

  return (
    <HStack w="full" p={2} m="auto">
      <Input
        placeholder="Search..."
        onChange={(e) => onFilterChange('patient_detail', e.target.value)}
        backgroundColor="gray.50"
        border="1px"
        w="25%"
        borderColor="gray.200"
        rounded="full"
                // _active={{
                //   boxShadow: 'lg',
                // }}
        // _selected={{
        //   boxShadow: 'md',
        //   borderColor: 'gray.100',
        //   backgroundColor: 'white',
        // }}
        // _focus={{
        //   boxShadow: 'md',
        //   borderColor: 'gray.100',
        //   backgroundColor: 'white',
        // }}
        // size="lg"
        value={patientName}
      />

      <FaFilter color="gray" />
      {/* <TableSearchFilter
        columnFilters={columnFilters}
        setColumFilters={setColumFilters}
      /> */}
    </HStack>
  );
};

export default TableSearchInput;

// TableSearchInput.propTypes = {
//   setFilter: PropTypes.func,
//   searchText: PropTypes.string,
// };

// TableSearchInput.defaultProps = {
//   setFilter: () => {},
//   searchText: '',
// };
