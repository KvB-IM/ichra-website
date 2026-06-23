import os
import glob
import re

json_ld = """
    <!-- JSON-LD Structured Data for AI/SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ICHRA Masters",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "An ICHRA platform engineered for licensed health insurance agents to manage quoting, enrollment, and client relationships while retaining 100% of their commissions and Agent of Record (AOR).",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "ICHRA Masters",
        "url": "https://ichramasters.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "service@ichramasters.com",
          "contactType": "customer support"
        }
      }
    }
    </script>
</head>
"""

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Check if already injected to avoid duplicates
    if "application/ld+json" not in content:
        # Inject right before </head>
        content = re.sub(r'</head>', json_ld, content, count=1, flags=re.IGNORECASE)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print(f"Successfully injected JSON-LD schema into {len(html_files)} HTML files.")
