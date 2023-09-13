import React, { useState } from 'react';
import { motion } from "framer-motion"
import { Card, CardContent, TextField, InputAdornment, Typography, IconButton, Fab, Divider, Select, MenuItem } from '@mui/material';
import { Check, Clear, Add, PlaylistRemove } from '@mui/icons-material';

import './Todo.scss';
import { Box } from '@mui/system';
import { useEffect } from 'react';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")))
  } else {
    return [];
  }
}

function Todo() {
  const [list, setList] = useState(getLocalStorage());
  const [newTitle, setNewTitle] = useState('');
  const [working, setWorking] = useState(true);
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);

  // Add items
  const addItems = () => {
    if (newTitle !== "") {
      setList([...list, { id: Date.now(), title: newTitle, completed: false }]); setNewTitle("");
      setWorking(true);
    } else {
      setWorking(false);
    }
  }

  // Delete items
  const deleteItems = (index) => {
    const updatedItems = list.filter((el) => {
      return index !== el.id;
    });
    setList(updatedItems);
  }

  // Completed
  const setCompleted = (item) => {
    setList(list.map(el => el.id === item.id ? { ...el, completed: !el.completed } : el));
  }

  // Delete all
  const deleteAll = () => {
    setList([]);
    setWorking(true);
  }

  // Status
  const handleChange = (e) => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    setData(list)
    if (status === 'done') {
      setData(list.filter((e) => e.completed))
    } else if (status === 'undone') {
      setData(list.filter((e) => !e.completed))
    }
  }, [list, status])

  return (
    <motion.div className="Todo-field"
      initial={{ y: -200, opacity: 0, }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="Todo-list-area">
        <Typography variant='h5' gutterBottom>TODO</Typography>
        <Card >
          <CardContent style={{ paddingBottom: '6px' }}>
            <TextField sx={{ outline: "#f3e5f5" }} className='text-field' onKeyDown={(e) => { e.key === 'Enter' && addItems(); setWorking(true) }} value={newTitle} onChange={e => setNewTitle(e.target.value)}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton sx={{ padding: { xs: "2px", sm: "6px", md: "8px" } }} onClick={() => addItems()}>
                      <Add />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton sx={{ padding: { xs: "2px", sm: "6px", md: "8px" } }} onClick={() => deleteAll()} className='clearBtn'>
                      <PlaylistRemove />
                    </IconButton>
                  </InputAdornment>

              }}
              fullWidth
              required
            />
            <div className="bottom-side">
              <p className={working ? 'error-msg' : 'error-msg active'}>You have to write something</p>
              <div className="filter" style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '5px' }}>
                <span>Filter:</span>
                <Select
                  sx={{
                    color: "white",
                    height: "20px",
                    width: "100px",
                    fontSize: "14px",
                    background: '#f3e5f5',
                    fontFamily: "'Poppins', sans-herif",
                    disableUnderline: true,
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(228, 219, 233, 0.25)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "#e1bee7 !important",
                    }
                  }}
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={status}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    All
                  </MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                  <MenuItem value="undone">Undone</MenuItem>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="Todo-list-items">
          {data.map((item) =>
            <>
              <Card key={item.id} className={item.completed ? 'done' : ''} sx={{ mt: 2 }}>
                <CardContent style={{ paddingBottom: "16px" }} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Fab
                    color="primary"
                    onClick={() => { setCompleted(item) }}
                    sx={{ borderRadius: "50%", scale: { xs: '0.8', sm: '1' } }}
                    size='small'
                    value="check"
                  >
                    <Check />
                  </Fab>
                  <Box style={{ wordWrap: 'break-word' }} sx={{ maxWidth: { xs: '130px', sm: '360px' }, fontSize: { xs: '14px', sm: '16px' } }} component={'span'}>{item.title}</Box>
                  <Fab
                    color='primary'
                    onClick={() => deleteItems(item.id)}
                    sx={{ borderRadius: "50%", scale: { xs: '0.8', sm: '1' } }}
                    size='small'
                    value="check"
                  >
                    <Clear />
                  </Fab>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Todo;
