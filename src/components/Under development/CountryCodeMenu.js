import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  '+91 | India',
  '+1 | United States',
  '+44 | United Kingdom',
];

export default function CountryCodeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <ListItem
          button
          onClick={handleClickListItem}
          sx={{
            width: "20px"
          }}
        >
          <ListItemText
            primary={options[selectedIndex].split(" ")[0]}
          />
        </ListItem>
        
        
        
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            {
                options.map((option, index) => {
                    return(
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    )
                })
            }
      </Menu>
    </>
  );
}
