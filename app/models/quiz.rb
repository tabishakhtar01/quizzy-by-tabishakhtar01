class Quiz < ApplicationRecord
    has_many :questions, dependent: :destroy
    has_many :attempts, dependent: :destroy
    has_many :reports, dependent: :destroy

    validates :title, presence: true
    validates :title, presence: true, length: { maximum: 50 }

    validates :slug, uniqueness: true
    validate :slug_not_changed

    before_create :set_slug

  
    private
  
    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Quiz.exists?(slug: slug_candidate)
        itr += 1
      end
    end
  
    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, 'is immutable!')
      end
    end
end