import { useEffect, useState } from 'react';
import {List, ListItem, ListItemText, MenuItem, Menu} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuButton = ({ options, callbackFunction, defaultValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
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


  useEffect(() => {
    if(callbackFunction && selectedIndex != 0){
      callbackFunction(options[selectedIndex]);
    }
  }, [selectedIndex]);

  
  return (
    <div>
        <List
          component="nav"
          aria-label="Device settings"
          sx={{
            backgroundColor: "#ffffff",
            height: "auto",
            padding: 0,
            borderRadius: "5px"
          }}
        >
            <ListItem
              button
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
              sx={{
                margin: 0, 
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
                <ListItemText 
                    sx={{margin: 0, }}
                    primaryTypographyProps = {{ 
                      sx: {
                        fontSize: "14px",
                        fontWeight: "400"
                      }
                    }}
                    primary={
                      (!defaultValue || defaultValue === "") ? 
                        options[selectedIndex]
                      :
                        defaultValue
                    }
                />

                <KeyboardArrowDownIcon />
            </ListItem>
        </List>

        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
          style={{
            maxHeight: "200px"
          }}
        >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            sx={{
              width: "100%"
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuButton;
