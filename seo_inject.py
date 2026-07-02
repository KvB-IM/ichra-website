import os, re

pages = {
    'what-is-ichra.html': 'https://ichramasters.com/what-is-ichra.html',
    'lies.html': 'https://ichramasters.com/lies.html',
    'model.html': 'https://ichramasters.com/model.html',
    'contact.html': 'https://ichramasters.com/contact.html',
    'blogs.html': 'https://ichramasters.com/blogs.html',
    'privacy.html': 'https://ichramasters.com/privacy.html',
    'terms.html': 'https://ichramasters.com/terms.html',
    'financial-benefits-ichra-smbs.html': 'https://ichramasters.com/financial-benefits-ichra-smbs.html',
    'ichra-masters-model-keep-100-commissions.html': 'https://ichramasters.com/ichra-masters-model-keep-100-commissions.html',
    'ichra-vs-traditional-group-insurance.html': 'https://ichramasters.com/ichra-vs-traditional-group-insurance.html',
    'the-3-biggest-lies-in-ichra.html': 'https://ichramasters.com/the-3-biggest-lies-in-ichra.html',
    'protecting-agency-future-third-party-ichra.html': 'https://ichramasters.com/protecting-agency-future-third-party-ichra.html',
    'step-by-step-ichra-quotes-enrollments.html': 'https://ichramasters.com/step-by-step-ichra-quotes-enrollments.html',
    'transitioning-book-of-business-ichra.html': 'https://ichramasters.com/transitioning-book-of-business-ichra.html',
    'ultimate-ichra-toolkit-licensed-agents.html': 'https://ichramasters.com/ultimate-ichra-toolkit-licensed-agents.html',
    'what-is-ichra-brokers-care.html': 'https://ichramasters.com/what-is-ichra-brokers-care.html',
    'why-employers-shifting-defined-contribution.html': 'https://ichramasters.com/why-employers-shifting-defined-contribution.html',
}

for filename, canonical_url in pages.items():
    if not os.path.exists(filename):
        print(f"SKIP: {filename} not found")
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has canonical
    if 'rel="canonical"' in content:
        print(f"SKIP: {filename} already has canonical")
        continue
    
    # Extract title for OG tags
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else filename
    
    # Extract meta description
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content)
    desc = desc_match.group(1) if desc_match else title
    
    # Build SEO tags to inject
    seo_tags = f'''    <link rel="canonical" href="{canonical_url}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc[:200]}">
    <meta property="og:site_name" content="ICHRA Masters">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{desc[:200]}">'''
    
    # Inject before </head>
    content = content.replace('</head>', seo_tags + '\n</head>')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"DONE: {filename}")

print("\nAll pages processed!")
