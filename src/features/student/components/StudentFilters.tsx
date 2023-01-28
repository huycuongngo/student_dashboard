import { Button, Grid, Box } from '@mui/material';
import { City, ListParams } from 'model';
import React, { ChangeEvent, useRef } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme()

const useStyles = makeStyles({
  clearBtn: {
    marginTop: '20px'
  }
})

export interface StudentFiltersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
  cityList: City[];
}

export default function StudentFilters({ filter, cityList, onChange, onSearchChange }: StudentFiltersProps) {
  const classes = useStyles()

  const searchRef = useRef<HTMLInputElement>()

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1
    }

    onSearchChange(newFilter)

  }

  const handleCityChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined
    }

    onChange(newFilter)

  };

  const handleSortChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    //e là 1 string gồm sort và order
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined
    }

    onChange(newFilter)
  }

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined
    }
    onChange(newFilter)

    if (searchRef.current) {
      searchRef.current.value = ''
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4} md={3}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <Input
              id="searchByName"
              endAdornment={<SearchIcon />}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4} md={3}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              autoWidth
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {
                cityList.map(city => (
                  <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={3}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel id="sortBy">Sort by</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              autoWidth
              label="Sort by"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={6} lg={1}>
          <Box className={classes.clearBtn} >
            <Button fullWidth variant='outlined' color='primary' onClick={handleClearFilter}>Clear</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
