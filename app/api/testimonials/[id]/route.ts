import { testimonialsApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonials = await testimonialsApi.getAll();
    const testimonial = testimonials.find(t => t.id === params.id);
    if (!testimonial) {
      return Response.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return Response.json(testimonial);
  } catch (error) {
    console.error('Failed to fetch testimonial:', error);
    return Response.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updatedTestimonial = await testimonialsApi.update(params.id, updates);
    return Response.json(updatedTestimonial);
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    return Response.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await testimonialsApi.delete(params.id);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    return Response.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}