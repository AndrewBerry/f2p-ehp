CREATE TYPE acc_type AS ENUM ('uim', 'hcim', 'im', 'reg');

CREATE TABLE stats_pit (
  stats_id UUID DEFAULT uuid_generate_v4(),
  created_at timestamp DEFAULT now(),
  is_latest boolean DEFAULT TRUE,
  
  ign varchar(12),
  acc_type acc_type,
  
  total_exp decimal DEFAULT 0,
  total_ehp decimal DEFAULT 0,
  total_lvl decimal DEFAULT 0,
  total_rnk decimal DEFAULT 0,
  
  smithing_exp decimal DEFAULT 0,
  smithing_ehp decimal DEFAULT 0,
  smithing_lvl decimal DEFAULT 0,
  smithing_rnk decimal DEFAULT 0,
  
  primary key (stats_id)
);

CREATE VIEW ranks AS
  SELECT
    ign,
    DENSE_RANK() OVER (ORDER BY total_ehp DESC) AS total_rnk,
    DENSE_RANK() OVER (ORDER BY smithing_ehp DESC) AS smithing_rnk
  FROM stats_pit
  WHERE
    is_latest IS TRUE;