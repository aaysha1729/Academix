import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import type { Course } from '@/types/database';
import TopBar from '@/components/layout/TopBar';
import CourseGrid from '@/components/courses/CourseGrid';
import CourseCard from '@/components/courses/CourseCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { BookOpen, ChevronDown, Plus } from 'lucide-react';

async function getCourses(): Promise<Course[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data as Course[]) || [];
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    return [];
  }
}

function CoursesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

async function CoursesContent() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-5">
          <BookOpen size={28} className="text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No courses found
        </h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Your enrolled courses will appear here. Browse the library to get
          started with your learning journey.
        </p>
      </section>
    );
  }

  return (
    <CourseGrid>
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </CourseGrid>
  );
}

export default function CoursesPage() {
  return (
    <>
      <TopBar title="Courses" />

      {/* Header section */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            My Courses
          </h2>
          <p className="text-sm text-gray-400 mt-1.5 max-w-lg">
            Continue your learning journey with Academix premium curriculum.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]
              text-sm text-gray-300 hover:bg-white/[0.06] transition-colors"
          >
            All Courses
            <ChevronDown size={14} className="text-gray-500" />
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600
              text-sm font-medium text-white transition-colors"
          >
            <Plus size={14} />
            Browse Library
          </button>
        </div>
      </section>

      {/* Courses grid with Suspense */}
      <Suspense fallback={<CoursesGridSkeleton />}>
        <CoursesContent />
      </Suspense>
    </>
  );
}
