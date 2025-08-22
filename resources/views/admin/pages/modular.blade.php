<h1>{{ $page->title }}</h1>
@foreach ($sections as $section)
{!! $section->content !!}
@endforeach