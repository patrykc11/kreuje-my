import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/projects";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    
    const allProjects = await getProjects();
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = allProjects.slice(startIndex, endIndex);
    
    return NextResponse.json({
      projects: paginatedProjects,
      hasMore: endIndex < allProjects.length,
      total: allProjects.length,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

