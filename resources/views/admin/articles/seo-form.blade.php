<hr class="my-4">
<h5 class="mb-3 fw-bold">Pengaturan SEO</h5>

<div class="row g-3">
    <!-- Meta Description -->
    <div class="col-md-6">
        <label for="meta_description" class="form-label">Meta Description</label>
        <textarea name="meta_description" id="meta_description" class="form-control"
            rows="2">{{ old('meta_description', $article->meta->meta_description ?? '') }}</textarea>
    </div>

    <!-- Meta Keywords -->
    <div class="col-md-6">
        <label for="meta_keywords" class="form-label">Meta Keywords (pisahkan dengan koma)</label>
        <input type="text" name="meta_keywords" id="meta_keywords" class="form-control"
            value="{{ old('meta_keywords', $article->meta->meta_keywords ?? '') }}">
    </div>

    <!-- Robots -->
    <div class="col-md-4">
        <label for="robots" class="form-label">Robots</label>
        <select name="robots" id="robots" class="form-select">
            @php
            $robotsOptions = ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'];
            $selectedRobots = old('robots', $article->meta->robots ?? 'index, follow');
            @endphp
            @foreach ($robotsOptions as $opt)
            <option value="{{ $opt }}" {{ $selectedRobots===$opt ? 'selected' : '' }}>{{ $opt }}</option>
            @endforeach
        </select>
    </div>

    <!-- Canonical URL -->
    <div class="col-md-8">
        <label for="canonical_url" class="form-label">Canonical URL</label>
        <input type="url" name="canonical_url" id="canonical_url" class="form-control"
            value="{{ old('canonical_url', $article->meta->canonical_url ?? '') }}">
    </div>

    <!-- OG Title -->
    <div class="col-md-6">
        <label for="og_title" class="form-label">OG Title</label>
        <input type="text" name="og_title" id="og_title" class="form-control"
            value="{{ old('og_title', $article->meta->og_title ?? '') }}">
    </div>

    <!-- OG Description -->
    <div class="col-md-6">
        <label for="og_description" class="form-label">OG Description</label>
        <textarea name="og_description" id="og_description" class="form-control"
            rows="2">{{ old('og_description', $article->meta->og_description ?? '') }}</textarea>
    </div>

    <!-- OG URL -->
    <div class="col-md-6">
        <label for="og_url" class="form-label">OG URL</label>
        <input type="url" name="og_url" id="og_url" class="form-control"
            value="{{ old('og_url', $article->meta->og_url ?? '') }}">
    </div>

    <!-- OG Type -->
    <div class="col-md-3">
        <label for="og_type" class="form-label">OG Type</label>
        <input type="text" name="og_type" id="og_type" class="form-control"
            value="{{ old('og_type', $article->meta->og_type ?? 'article') }}">
    </div>

    <!-- OG Site Name -->
    <div class="col-md-3">
        <label for="og_site_name" class="form-label">OG Site Name</label>
        <input type="text" name="og_site_name" id="og_site_name" class="form-control"
            value="{{ old('og_site_name', $article->meta->og_site_name ?? config('app.name')) }}">
    </div>

    <!-- OG Image -->
    <div class="col-md-6">
        <label for="og_image" class="form-label">OG Image</label>
        <input type="file" name="og_image" id="og_image" class="form-control">
        @if(isset($article->meta->og_image))
        <small class="text-muted">Saat ini: <a href="{{ asset('storage/'.$article->meta->og_image) }}"
                target="_blank">Lihat gambar</a></small>
        @endif
    </div>

    <!-- Twitter Card -->
    <div class="col-md-3">
        <label for="twitter_card" class="form-label">Twitter Card</label>
        <input type="text" name="twitter_card" id="twitter_card" class="form-control"
            value="{{ old('twitter_card', $article->meta->twitter_card ?? 'summary_large_image') }}">
    </div>

    <!-- Twitter Title -->
    <div class="col-md-9">
        <label for="twitter_title" class="form-label">Twitter Title</label>
        <input type="text" name="twitter_title" id="twitter_title" class="form-control"
            value="{{ old('twitter_title', $article->meta->twitter_title ?? '') }}">
    </div>

    <!-- Twitter Description -->
    <div class="col-md-12">
        <label for="twitter_description" class="form-label">Twitter Description</label>
        <textarea name="twitter_description" id="twitter_description" class="form-control"
            rows="2">{{ old('twitter_description', $article->meta->twitter_description ?? '') }}</textarea>
    </div>

    <!-- Twitter Site -->
    <div class="col-md-6">
        <label for="twitter_site" class="form-label">Twitter Site</label>
        <input type="text" name="twitter_site" id="twitter_site" class="form-control"
            value="{{ old('twitter_site', $article->meta->twitter_site ?? '@yourbrand') }}">
    </div>

    <!-- Twitter Image -->
    <div class="col-md-6">
        <label for="twitter_image" class="form-label">Twitter Image</label>
        <input type="file" name="twitter_image" id="twitter_image" class="form-control">
        @if(isset($article->meta->twitter_image))
        <small class="text-muted">Saat ini: <a href="{{ asset('storage/'.$article->meta->twitter_image) }}"
                target="_blank">Lihat gambar</a></small>
        @endif
    </div>
</div>