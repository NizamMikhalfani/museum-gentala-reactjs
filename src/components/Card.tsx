"use client";
import Image from 'next/image';
import React from 'react';

export type Social = { icon: string; url: string };
export type CardProps = {
  name: string;
  role?: string;
  bio?: string;
  img: string;
  alt?: string;
  socials?: Social[];
  onSocialClick?: (s: Social) => void;
};

export const Card: React.FC<CardProps> = ({ name, role, bio, img, alt, socials = [], onSocialClick }) => {
  return (
    <div className="card">
      <div className="card-imageWrap">
        <Image
          src={img}
          alt={alt || name}
          width={360}
          height={340}
          className="card-image"
          sizes="(max-width: 768px) 100vw, 360px"
          priority={false}
        />
      </div>
      <div className="card-content">
        <h2>{name}</h2>
        {role && <h3>{role}</h3>}
        {bio && <p>{bio}</p>}
        {socials.length > 0 && (
          <div className="card-socials">
            {socials.map((s) => (
              <button
                key={s.url}
                onClick={() => onSocialClick?.(s)}
                aria-label={`open ${name} on ${s.icon}`}
                className="card-socialBtn"
              >
                <i className={`fa-brands fa-${s.icon}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
