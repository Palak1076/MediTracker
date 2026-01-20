// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// import {
//   fetchDashboardAnalytics,
//   fetchAdherenceAnalytics,
//   fetchConsumptionTrends,
//   fetchComparisonAnalytics,
// } from "../api/analytics";

// /* -------------------- SMALL STAT CARD -------------------- */
// const StatCard = ({ title, value }) => (
//   <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//     <CardContent>
//       <Typography variant="body2" color="text.secondary">
//         {title}
//       </Typography>
//       <Typography variant="h5" fontWeight="bold">
//         {value}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// /* -------------------- MAIN DASHBOARD -------------------- */
// const AnalyticsDashboard = () => {
//   const [dashboard, setDashboard] = useState({});
//   const [adherence, setAdherence] = useState({});
//   const [trends, setTrends] = useState([]);
//   const [comparison, setComparison] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const startDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");
//   const endDate = dayjs().format("YYYY-MM-DD");

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [
//           dashboardRes,
//           adherenceRes,
//           trendsRes,
//           comparisonRes,
//         ] = await Promise.all([
//           fetchDashboardAnalytics({ startDate, endDate }),
//           fetchAdherenceAnalytics({ startDate, endDate }),
//           fetchConsumptionTrends({ startDate, endDate }),
//           fetchComparisonAnalytics({ period: "month" }),
//         ]);

//         /* ---------------- FALLBACK FAKE DATA ---------------- */
//         setDashboard(
//           Object.keys(dashboardRes || {}).length
//             ? dashboardRes
//             : {
//                 totalMedications: 4,
//                 todayDoses: { total: 6 },
//                 adherenceRate: 86,
//                 streakInfo: { currentStreak: 9 },
//               }
//         );

//         setAdherence(
//           Object.keys(adherenceRes || {}).length
//             ? adherenceRes
//             : { overallAdherence: 86 }
//         );

//         setTrends(
//           trendsRes?.length
//             ? trendsRes
//             : [
//                 { date: "01 Jan", taken: 3, missed: 1 },
//                 { date: "05 Jan", taken: 4, missed: 0 },
//                 { date: "10 Jan", taken: 3, missed: 2 },
//                 { date: "15 Jan", taken: 5, missed: 0 },
//                 { date: "20 Jan", taken: 4, missed: 1 },
//               ]
//         );

//         setComparison(
//           comparisonRes?.length
//             ? comparisonRes
//             : [
//                 { medication: "Paracetamol", taken: 20, missed: 4 },
//                 { medication: "Vitamin D", taken: 25, missed: 1 },
//                 { medication: "Antibiotic", taken: 18, missed: 6 },
//               ]
//         );
//       } catch (err) {
//         console.error("Analytics load failed:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading) {
//     return <Typography>Loading analytics...</Typography>;
//   }

//   return (
//     <Box p={3}>
//       {/* ---------------- OVERVIEW ---------------- */}
//       <Box mb={4}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Overview
//         </Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Total Medications"
//               value={dashboard.totalMedications || 0}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Today's Doses"
//               value={dashboard.todayDoses?.total || 0}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Adherence Rate"
//               value={`${dashboard.adherenceRate || 0}%`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Current Streak"
//               value={dashboard.streakInfo?.currentStreak || 0}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* ---------------- ADHERENCE ---------------- */}
//       <Box mb={4}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Adherence
//         </Typography>

//         <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//           <CardContent>
//             <Typography variant="body2" color="text.secondary">
//               Overall adherence
//             </Typography>
//             <Typography variant="h3" fontWeight="bold" color="success.main">
//               {adherence.overallAdherence || 0}%
//             </Typography>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* ---------------- TRENDS ---------------- */}
//       <Box mb={4}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Consumption Trends
//         </Typography>

//         <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//           <CardContent sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={trends}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="taken" />
//                 <Line type="monotone" dataKey="missed" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* ---------------- COMPARISON ---------------- */}
//       <Box>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Medication Comparison
//         </Typography>

//         <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//           <CardContent sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={comparison}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="medication" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="taken" />
//                 <Bar dataKey="missed" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default AnalyticsDashboard;
// src/pages/AnalyticsDashboard.jsx
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Insights, Timeline, TrendingUp, BarChart } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as BarC,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch wrapper
const fetchWithAuth = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(text); }
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
};

// Dummy API fetch functions
const fetchDashboardAnalytics = async ({ startDate, endDate }) => {
  try {
    const data = await fetchWithAuth(
      `${API_URL}/analytics/dashboard?startDate=${startDate}&endDate=${endDate}`
    );
    return data?.data || null;
  } catch { return null; }
};
const fetchTrendsAnalytics = async ({ startDate, endDate }) => {
  try {
    const data = await fetchWithAuth(
      `${API_URL}/analytics/trends?startDate=${startDate}&endDate=${endDate}`
    );
    return data?.data || null;
  } catch { return null; }
};
const fetchComparisonAnalytics = async () => {
  try {
    const data = await fetchWithAuth(
      `${API_URL}/analytics/comparison?period=month&medications=`
    );
    return data?.data || null;
  } catch { return null; }
};

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState({
    totalMedications: 0,
    todayDoses: { total: 0 },
    adherenceRate: 0,
    streakInfo: { currentStreak: 0 },
  });
  const [trends, setTrends] = useState([]);
  const [comparison, setComparison] = useState([]);

  const startDateRef = dayjs().subtract(30, "day").toISOString();
  const endDateRef = dayjs().toISOString();

  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true);
  //     try {
  //       const [dashboardData, trendsData, comparisonData] = await Promise.all([
  //         fetchDashboardAnalytics({ startDate: startDateRef, endDate: endDateRef }),
  //         fetchTrendsAnalytics({ startDate: startDateRef, endDate: endDateRef }),
  //         fetchComparisonAnalytics(),
  //       ]);

  //       setDashboard(
  //         dashboardData || {
  //           totalMedications: 5,
  //           todayDoses: { total: 6 },
  //           adherenceRate: 87,
  //           streakInfo: { currentStreak: 9 },
  //         }
  //       );

  //       setTrends(
  //         trendsData?.length
  //           ? trendsData
  //           : [
  //               { date: "01 Jan", taken: 3, missed: 1 },
  //               { date: "05 Jan", taken: 4, missed: 0 },
  //               { date: "10 Jan", taken: 3, missed: 2 },
  //             ]
  //       );

  //       setComparison(
  //         comparisonData?.length
  //           ? comparisonData
  //           : [
  //               { medication: "Paracetamol", taken: 20, missed: 4 },
  //               { medication: "Vitamin D", taken: 25, missed: 1 },
  //             ]
  //       );
  //     } catch (err) {
  //       console.error("Error loading analytics:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, [startDateRef, endDateRef]);
  useEffect(() => {
  const loadData = async () => {
    setLoading(true);

    try {
      // Fake data directly
      setDashboard({
        totalMedications: 5,
        todayDoses: { total: 6 },
        adherenceRate: 87,
        streakInfo: { currentStreak: 9 },
      });

      setTrends([
        { date: "01 Jan", taken: 3, missed: 1 },
        { date: "05 Jan", taken: 4, missed: 0 },
        { date: "10 Jan", taken: 3, missed: 2 },
      ]);

      setComparison([
        { medication: "Paracetamol", taken: 20, missed: 4 },
        { medication: "Vitamin D", taken: 25, missed: 1 },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);


  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="scrollable"
      >
        <Tab icon={<Insights />} label="Overview" />
        <Tab icon={<Timeline />} label="Trends" />
        <Tab icon={<BarChart />} label="Comparison" />
      </Tabs>

      <Box mt={3}>
        {activeTab === 0 && <OverviewTab data={dashboard} />}
        {activeTab === 1 && <TrendsTab data={trends} />}
        {activeTab === 2 && <ComparisonTab data={comparison} />}
      </Box>
    </Box>
  );
};

// --- Animated StatCard ---
const StatCard = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ flex: 1, minWidth: 120 }}
  >
    <Card
      sx={{
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

// --- Overview Tab ---
const OverviewTab = ({ data }) => (
  <Grid container spacing={2}>
    <StatCard title="Total Medications" value={data?.totalMedications ?? 0} />
    <StatCard title="Today Doses" value={data?.todayDoses?.total ?? 0} />
    <StatCard title="Adherence Rate" value={`${data?.adherenceRate ?? 0}%`} />
    <StatCard title="Current Streak" value={data?.streakInfo?.currentStreak ?? 0} />
  </Grid>
);

// --- Trends Tab ---
const TrendsTab = ({ data }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <Box mt={2} height={300}>
      {data.length === 0 ? (
        <Typography>No trends data</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="taken" stroke="#3b82f6" />
            <Line type="monotone" dataKey="missed" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  </motion.div>
);

// --- Comparison Tab ---
const ComparisonTab = ({ data }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <Box mt={2} height={300}>
      {data.length === 0 ? (
        <Typography>No comparison data</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarC data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="medication" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="taken" fill="#3b82f6" />
            <Bar dataKey="missed" fill="#ef4444" />
          </BarC>
        </ResponsiveContainer>
      )}
    </Box>
  </motion.div>
);

export default AnalyticsDashboard;


// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import {
//   Tabs,
//   Tab,
//   Box,
//   CircularProgress,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
// } from "@mui/material";
// import {
//   Insights,
//   Timeline,
//   TrendingUp,
//   Warning,
//   BarChart,
// } from "@mui/icons-material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   BarChart as BarC,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";

// const API_URL = import.meta.env.VITE_API_URL;

// // Helper to fetch with JWT
// const fetchWithAuth = async (url) => {
//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   const text = await res.text(); // 👈 IMPORTANT

//   let data;
//   try {
//     data = JSON.parse(text);
//   } catch {
//     throw new Error(text); // handles "Too many requests"
//   }

//   if (!res.ok) {
//     throw new Error(data.message || "Request failed");
//   }

//   return data;
// };


// const AnalyticsDashboard = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [dashboard, setDashboard] = useState({});
//   const [adherence, setAdherence] = useState({});
//   const [trends, setTrends] = useState([]);
//   const [sideEffects, setSideEffects] = useState([]);
//   const [comparison, setComparison] = useState([]);
// const [startDate, setStartDate] = useState(dayjs().subtract(30, "day"));
// const [endDate, setEndDate] = useState(dayjs());


//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const start = startDate.toISOString();
// const end = endDate.toISOString();


//         const [
//           dashboardData,
//           adherenceData,
//           trendsData,
//           sideEffectsData,
//           comparisonData,
//         ] = await Promise.all([
//           fetchWithAuth(`${API_URL}/analytics/dashboard?startDate=${start}&endDate=${end}`),
//          // fetchWithAuth(`${API_URL}/analytics/dashboard?startDate=${startDateRef}&endDate=${endDateRef}`),
//           fetchWithAuth(`${API_URL}/analytics/adherence?startDate=${start}&endDate=${end}`),
//           // fetchWithAuth(`${API_URL}/analytics/adherence?startDate=${startDateRef}&endDate=${endDateRef}`),
//           fetchWithAuth(`${API_URL}/analytics/trends?startDate=${start}&endDate=${end}`),
//          // fetchWithAuth(`${API_URL}/analytics/trends?startDate=${startDateRef}&endDate=${endDateRef}`),
//          fetchWithAuth(`${API_URL}/analytics/side-effects?startDate=${start}&endDate=${end}`),
//          // fetchWithAuth(`${API_URL}/analytics/side-effects?startDate=${startDateRef}&endDate=${endDateRef}`),
//           fetchWithAuth(`${API_URL}/analytics/comparison?period=month&medications=`),
//         ]);

//         setDashboard(dashboardData.data?.overview || {});

//         setAdherence(adherenceData || {});
//         setTrends(
//   Array.isArray(trendsData)
//     ? trendsData
//     : Object.entries(trendsData || {}).map(([date, values]) => ({
//         date,
//         ...values,
//       }))
// );

// setComparison(
//   Array.isArray(comparisonData)
//     ? comparisonData
//     : []
// );

//         setSideEffects(
//           Array.isArray(sideEffectsData)
//             ? sideEffectsData
//             : Object.entries(sideEffectsData || {}).map(([name, count]) => ({ name, count }))
//         );
        
//       } catch (err) {
//         console.error("Error loading analytics:", err);
//         setError("Failed to load analytics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [startDate, endDate]);

//   if (loading) return <Loader />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box p={4}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Analytics Dashboard
//       </Typography>

//       <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable">
//         <Tab icon={<Insights />} label="Overview" />
//         <Tab icon={<Timeline />} label="Adherence" />
//         <Tab icon={<TrendingUp />} label="Trends" />
//         <Tab icon={<Warning />} label="Side Effects" />
//         <Tab icon={<BarChart />} label="Comparison" />
//       </Tabs>

//       <Box mt={3}>
//         {activeTab === 0 && <OverviewTab data={dashboard} />}
//         {activeTab === 1 && <AdherenceTab data={adherence} />}
//         {activeTab === 2 && <TrendsTab data={trends} />}
//         {activeTab === 3 && <SideEffectsTab data={sideEffects} />}
//         {activeTab === 4 && <ComparisonTab data={comparison} />}
//       </Box>
//     </Box>
//   );
// };

// /* Loader */
// const Loader = () => (
//   <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//     <CircularProgress />
//   </Box>
// );

// /* Overview Tab */
// const OverviewTab = ({ data }) => (
//   <Grid container spacing={2}>
//     <StatCard title="Total Medications" value={data.totalMedications || 0} />
//     <StatCard title="Today Doses" value={data.todayDoses?.total || 0} />
//     <StatCard title="Adherence Rate" value={`${data.adherenceRate || 0}%`} />
//     <StatCard title="Current Streak" value={data.streakInfo?.currentStreak || 0} />
//   </Grid>
// );

// /* Adherence Tab */
// const AdherenceTab = ({ data }) => (
//   <Box mt={2}>
//     <Typography variant="h6">Overall Adherence</Typography>
//     <Typography variant="h4" color="green">{data.overallAdherence || 0}%</Typography>
//   </Box>
// );

// /* Trends Tab */
// const TrendsTab = ({ data }) => (
//   <Box mt={2} height={300}>
//     {data.length === 0 ? (
//       <Typography>No trends data available</Typography>
//     ) : (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="taken" stroke="#3b82f6" />
//           <Line type="monotone" dataKey="missed" stroke="#ef4444" />
//         </LineChart>
//       </ResponsiveContainer>
//     )}
//   </Box>
// );

// const SideEffectsTab = ({ data }) => {
//   const sideEffects = Array.isArray(data) ? data : [];

//   return (
//     <Grid container spacing={2} mt={2}>
//       {sideEffects.length === 0 ? (
//         <Typography>🎉 No side effects reported</Typography>
//       ) : (
//         sideEffects.map((s, i) => (
//           <Grid item key={i}>
//             <Card sx={{ minWidth: 150 }}>
//               <CardContent>
//                 <Typography>{s.name || "Unknown"}</Typography>
//                 <Typography fontWeight="bold">
//                   {Number.isFinite(Number(s.count)) ? Number(s.count) : 0}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))
//       )}
//     </Grid>
//   );
// };




// /* Comparison Tab */
// const ComparisonTab = ({ data }) => (
//   <Box mt={2} height={300}>
//     {data.length === 0 ? (
//       <Typography>No comparison data</Typography>
//     ) : (
//       <ResponsiveContainer width="100%" height="100%">
//         <BarC data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="medication" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="taken" fill="#3b82f6" />
//           <Bar dataKey="missed" fill="#ef4444" />
//         </BarC>
//       </ResponsiveContainer>
//     )}
//   </Box>
// );

// /* Stat Card */
// const StatCard = ({ title, value }) => (
//   <Card sx={{ flex: 1, minWidth: 120 }}>
//     <CardContent>
//       <Typography variant="body2" color="textSecondary">{title}</Typography>
//       <Typography variant="h5" fontWeight="bold">{value}</Typography>
//     </CardContent>
//   </Card>
// );

// export default AnalyticsDashboard;
