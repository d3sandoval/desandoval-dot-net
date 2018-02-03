// @flow weak

import React from 'react';
import {withStyles} from 'material-ui/styles';
import SectionTitle from './SectionTitle';
import Grid from 'material-ui/Grid';
import HonorsBox from './HonorsBox';

const styles = theme => ({
  root: {

  }
});

const honors = [
  {
    logo: '/img/honors/HackTheCD.png',
    title: 'First Place Winner',
    organization: 'HackTheCD',
    description: 'Developed Prep50 – the winning venture of AfricaTown Cultural Innovation Founders',
    url: 'http://hackthecd.org/',
  },
  {
    logo: '/img/honors/SSJH.png',
    title: 'Designer & Co-Organizer',
    organization: 'Seattle\'s Social Justice Hackathon',
    description: 'Designed and organized a Hackathon and Demo Day at Seattle University’s School of Law and Seattle’s City Hall, respectively',
    url: 'http://socialjusticehackathon.com/',
  },
  {
    logo: '/img/honors/cscw.png',
    title: 'Contributor',
    organization: 'ACM Conference',
    description: 'Co-authored “Characterizing Online Rumoring Behavior Using Multi-Dimensional Signatures”',
    url: '/portfolio/data-analysis-characterizing-online-rumoring-behavior-using-multi-dimensional-signatures',
  },
  {
    logo: '/img/honors/conveyux.png',
    title: 'Presenter',
    organization: 'ConveyUX Seattle',
    description: 'Showcased the DES Alert System to the Seattle UX Community',
    url: '/portfolio/a-better-uw-alert-system',
  },
  {
    logo: '/img/honors/PACC.png',
    title: 'Mentor',
    organization: '2014 Paul Allen Computing Challenge',
    description: 'Acted as an academic resource for HS students interested in Big Data',
    url: 'http://www.garfieldcs.com/2013/12/2013-2014-paul-allen-computing-challenge-pacc/',
  },
  {
    logo: '/img/honors/psrf.png',
    title: 'Scholarship Winner',
    organization: '2015 PSRF Conference',
    description: 'Attended professional market research event @ Boeing’s Museum of Flight',
    url: 'http://pugetsoundresearchforum.org',
  },
  {
    logo: '/img/honors/hcde.png',
    title: 'Dean\'s List & Diversity Scholar',
    organization: 'University of Washington',
    description: 'Scholarship status awarded based on GPA',
    url: 'http://www.washington.edu/students/qtrdean/',
  },
  {
    logo: '/img/honors/foresters.png',
    title: 'Competitive Scholar',
    organization: 'Foresters Competitive Scholarship',
    description: 'Scholarship winner 2012 – 2015, granted yearly',
    url: 'http://www.foresters.com/en/foresters-difference/grants-and-scholarships/foresters-competitive-scholarship',
  },
  {
    logo: '/img/honors/eaglescout.png',
    title: 'Eagle Scout',
    organization: 'Boy Scouts of America',
    description: 'Designed and developed home-made electronic whiteboards for Mercy High School',
    url: 'http://www.nesa.org/trail.html',
  },
]

function HonorsSummary(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <SectionTitle title="Honors" divider={true} />
      <Grid container justify="space-around" alignItems="flex-start">
        {honors.map(honor => (
          <Grid key={honor.title} item xs={8} sm={4} lg={3}>
            <HonorsBox details={honor} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(HonorsSummary);(HonorsSummary);