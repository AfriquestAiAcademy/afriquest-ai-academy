export default function StudentDashboard() {
  const [progress, setProgress] = useState(70);

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data } = await supabase
        .from("class_enrollments")
        .select("*, classes(*)")
        .eq("student_id", user.id);

      return data || [];
    },
  });

  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data } = await supabase
        .from("assignment_submissions")
        .select("*, assignments(*)")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(5);

      return data || [];
    },
  });

  const isLoading = enrollmentsLoading || assignmentsLoading;

  if (isLoading) {
    return (
      <div className="px-4 space-y-6 max-w-[1200px] mx-auto">
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="px-4 space-y-6 max-w-[1200px] mx-auto">
      <WelcomeBanner />
      <ProfileCompletion />
      <StatsSummary enrollments={enrollments} assignments={assignments} />
      <NotificationsPanel />
      <ProgressTracker progress={progress} />
      <QuickActions />
      <RecentActivity assignments={assignments} />
    </div>
  );
}