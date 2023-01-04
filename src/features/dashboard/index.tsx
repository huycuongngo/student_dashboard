import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { dashboardAction, selectDashboardLoading, selectDashboardStatistics, selectHighestMarkStudentList, selectLowestMarkStudentList, selectRankingByCityList } from './dashboardSlice';
import StatisticsItem from './Component/StatisticsItem';
import { PeopleAlt, ChatBubble, LinearScaleOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import Widget from './Component/Widget';
import StudentRankingList from './Component/StudentRankingList';

const theme = createTheme()

const useStyles = makeStyles({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
});

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashboardLoading)
  const statistics = useAppSelector(selectDashboardStatistics)
  const highestMarkStudentList = useAppSelector(selectHighestMarkStudentList)
  const lowestMarkStudentList = useAppSelector(selectLowestMarkStudentList)
  const rankingByCity = useAppSelector(selectRankingByCityList)

  const classes = useStyles()

  useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch])

  return (
    <Box className={classes.root}>
      {/* Loading */}
      <div className={classes.loading}>
        {loading && <LinearProgress />}
      </div>
      {/* Statistics Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem icon={<PeopleAlt fontSize="large" color="primary" />} label="male" value={statistics.maleCount} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem icon={<PeopleAlt fontSize="large" color="primary" />} label="female" value={statistics.femaleCount} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem icon={<ChatBubble fontSize="large" color="primary" />} label="mark >= 8" value={statistics.highMarkCount} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem icon={<LinearScaleOutlined fontSize="large" color="primary" />} label="mark <= 5" value={statistics.lowMarkCount} />
        </Grid>
      </Grid>

      {/* All student ranking */}
      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title='Student with highest mark'>
                <StudentRankingList studentList={highestMarkStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title='Student with lowest mark'>
                <StudentRankingList studentList={lowestMarkStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Student ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {
              rankingByCity.map((ranking) => (
                <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                  <Widget title={`Thành phố ${ranking.cityName}`}>
                    <StudentRankingList studentList={ranking.rankingList} />
                  </Widget>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
