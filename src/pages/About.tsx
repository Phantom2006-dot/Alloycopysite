import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <section className="text-center mb-16 animate-fade-in">
          <h2 className="section-title mb-8">WHO WE ARE</h2>
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-serif text-foreground/90">
            BAUHAUS is a creative company dedicated to books, films, publishing, and tourism — connecting audiences worldwide to the rich culture and destinations of Nigeria.
          </p>
        </section>

        <div className="divider mb-16" />

        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="section-title text-center mb-12">WHAT WE DO</h2>
          
          <div className="space-y-6 body-text text-justify">
            <p>
              BAUHAUS operates at the intersection of storytelling and cultural exploration. We develop and publish compelling books that celebrate Nigerian heritage, produce films and documentaries that share African stories with the world, and create comprehensive tourism guides for travelers seeking authentic experiences.
            </p>
            
            <p>
              Our publishing division works with talented authors to bring diverse voices and perspectives to readers globally. From fiction that captures the essence of Nigerian life to non-fiction that explores our rich history, we're committed to quality storytelling.
            </p>

            <p>
              Through our films and documentaries, we showcase the vibrant cultures, landscapes, and people of Nigeria and beyond. Our visual storytelling brings these narratives to life for audiences everywhere.
            </p>

            <p>
              Our tourism initiatives provide travelers with detailed guides to Nigeria's most captivating destinations — from the bustling streets of Lagos to the historic sites of Ile-Ife, from the beaches of Akwa Ibom to the capital city of Abuja.
            </p>
          </div>
        </section>

        <div className="divider my-16" />

        <section className="animate-slide-up text-center" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-title mb-8">OUR VISION</h2>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mx-auto">
            To be the leading platform for Nigerian storytelling and cultural exploration, inspiring readers, viewers, and travelers to discover the beauty and depth of our heritage.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default About;
