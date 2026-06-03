import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types/database";
import TopBar from "@/components/layout/TopBar";
import BentoGrid from "@/components/dashboard/BentoGrid";
import HeroTile from "@/components/dashboard/HeroTile";
import CourseTileSmall from "@/components/dashboard/CourseTileSmall";
import ActivityTile from "@/components/dashboard/ActivityTile";
import SkeletonCard from "@/components/ui/SkeletonCard";

async function getCourses(): Promise<Course[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(4);

    if (error) throw error;
    return (data as Course[]) || [];
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    return [];
  }
}

async function DashboardContent() {
  const courses = await getCourses();

  // Pick the first course for the hero row, rest for the second row
  const heroCourse = courses[0] || null;
  const remainingCourses = courses.slice(1);

  return (
    <BentoGrid>
      {/* Row 1: Hero + Featured Course */}
      <HeroTile />
      {heroCourse && <CourseTileSmall course={heroCourse} index={0} />}

      {/* Row 2: Remaining Courses */}
      {remainingCourses.map((course, i) => (
        <CourseTileSmall key={course.id} course={course} index={i + 1} />
      ))}

      {/* Row 3: Activity Graph */}
      <ActivityTile />
    </BentoGrid>
  );
}

export default function DashboardPage() {
  return (
    <>
      <TopBar title="Dashboard" />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            <SkeletonCard className="col-span-1 md:col-span-2 h-48" />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard className="col-span-1 md:col-span-2 lg:col-span-3 h-44" />
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </>
  );
}
