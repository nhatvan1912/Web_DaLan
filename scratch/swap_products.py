import re

def swap_products(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Normalize: put closing </div> and next product <div ...> on separate lines
    # This prevents products from being stuck on the same line
    content = content.replace('</div><div class="product-small col', '</div>\n<div class="product-small col')
    
    # Normalize: put closing </div> of the last product and container closing </div><!-- row --> on separate lines
    content = content.replace('</div></div><!-- row -->', '</div>\n</div><!-- row -->')
    
    lines = content.splitlines(keepends=True)
    
    # Find all line indices where a product column starts
    product_start_indices = []
    for idx, line in enumerate(lines):
        if line.strip().startswith('<div class="product-small col'):
            product_start_indices.append(idx)
            
    print(f"File: {file_path}")
    print(f"Found {len(product_start_indices)} products starting at indices: {product_start_indices}")
    
    if len(product_start_indices) != 12:
        print(f"Error: expected exactly 12 products, but found {len(product_start_indices)}")
        return
        
    # Group the lines for each product
    product_blocks = []
    for i in range(12):
        start_idx = product_start_indices[i]
        if i < 11:
            end_idx = product_start_indices[i+1]
        else:
            # For the last product, we find where the container ends (which starts with </div><!-- row -->)
            end_idx = start_idx
            while end_idx < len(lines):
                if '</div><!-- row -->' in lines[end_idx]:
                    break
                end_idx += 1
        
        product_blocks.append(lines[start_idx:end_idx])
        
    # Verify titles (ASCII safe)
    for idx, block in enumerate(product_blocks):
        block_text = "".join(block)
        title_match = re.search(r'woocommerce-loop-product__title[^>]*><a[^>]*>(.*?)</a>', block_text)
        title = title_match.group(1) if title_match else "Unknown"
        print(f"  Product {idx+1}: {title.strip().encode('ascii', 'ignore').decode('ascii')}")
        
    # Swap first 6 with last 6
    swapped_blocks = product_blocks[6:] + product_blocks[:6]
    
    # Assemble back the lines
    first_product_start = product_start_indices[0]
    last_product_end = product_start_indices[11]
    # Re-find the container end index for replacement
    container_end_idx = last_product_end
    while container_end_idx < len(lines):
        if '</div><!-- row -->' in lines[container_end_idx]:
            break
        container_end_idx += 1
        
    flat_swapped_lines = []
    for block in swapped_blocks:
        flat_swapped_lines.extend(block)
        
    new_lines = lines[:first_product_start] + flat_swapped_lines + lines[container_end_idx:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Successfully swapped products in {file_path}!\n")

swap_products('shop/index.html')
swap_products('en/shop/index.html')
