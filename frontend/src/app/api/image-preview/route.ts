import { NextRequest, NextResponse } from 'next/server';
import { getLinkPreview } from 'link-preview-js';
import { unstable_noStore } from 'next/cache';

export async function POST(request: NextRequest) {
  unstable_noStore();
  try {
    const body = await request.json();
    const data: ImagePreviewResType = (await getLinkPreview(body.url, {
      imagesPropertyType: 'og',
      followRedirects: 'follow',
    })) as ImagePreviewResType;
    console.log(data.mediaType == 'image');
    if (data.images && data.images.length !== 0) {
      return NextResponse.json({ status: 200, data });
    } else if (data.mediaType == 'image') {
      return NextResponse.json({
        status: 200,
        data: { ...data, images: [data.url] },
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 404, message: `Not found ${error}` });
  }
}
