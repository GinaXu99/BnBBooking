import Image from 'next/image';

export default function ImageContainer({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  return (
    <section className='h-[300px] md:h-[500px] mt-8 relative'>
      <Image
        priority
        className='object-cover rounded'
        src={mainImage}
        alt={name}
        fill
        sizes='100vw'
      />
    </section>
  );
}
