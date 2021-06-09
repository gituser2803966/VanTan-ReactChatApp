import React from "react";
import Conversation from './Conversation';
import Contact from './Contact';  
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabList:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  customTabPanel:{
    height:'80vh',
    maxHeight:'80vh',
  },
  TabPanelContent:{
    height:'100%',
    maxHeight:'100%',
    padding: '8px',
    overflowY:'scroll',
  },
  padding: {
    padding: theme.spacing(3)
  },
  demo1: {
    backgroundColor: 'transparent'
  },
  demo2: {
    backgroundColor: "transparent"
  }
}));

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "transparent"
  }
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 70,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(2),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      className={classes.customTabPanel}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.TabPanelContent}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function TabsPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs className={classes.tabList} value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Trò chuyện" />
          <AntTab label="Liên hệ" />
          <AntTab label="Call" />
        </AntTabs>
      </div>
      <div className={classes.demo2}>
      <SwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Conversation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Contact />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Cuộc gọi
        </TabPanel>
      </SwipeableViews> 
      </div>
    </div>
  );
}
