import React from 'react';

export const AVAILABILITY_TOOLTIP_CONTENT = (
  <span className="text-xs">
    Use availability to limit how many availabilities there are on this event.
    <br />
    If connected to resources, you can either set an availability to limit it on this event, or let it stay open to be
    managed by the resource limit.
  </span>
);

export const RESOURCES_TOOLTIP_CONTENT = (
  <span className="text-xs">
    Use resources to define the inventory so you can manage it from one place and be able to share it between several
    products. You can add more than one resource and rearrange the order from which it should deduct first.
  </span>
);

export const STRIPE_MODE_TOOLTIP_CONTENT = (
  <span className="text-xs">
    Use the Test Mode to test payments and switch to Live Mode when you are ready to go Live.
    <br />
    <br />
    Test card: 4242 4242 4242 4242
    <br />
    Date: (12/28)
    <br />
    CV2: 123
  </span>
);
